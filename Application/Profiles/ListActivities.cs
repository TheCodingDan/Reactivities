using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var date = DateTime.UtcNow;
                var query = _context.ActivityAtendees.Where(x => x.AppUser.UserName == request.Username)
                    .OrderBy(d => d.Activity.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                switch(request.Predicate){
                    case "future":
                        query = query.Where(d => d.Date >= date);
                        break;
                    case "past":
                        query = query.Where(d => d.Date < date);
                        break;
                    case "hosting":
                        query = query.Where(u => u.HostUsername == request.Username);
                        break;
                }

                return Result<List<UserActivityDto>>.Success(await query.ToListAsync());
            }
        }
    }
}