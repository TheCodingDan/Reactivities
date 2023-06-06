using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //Command não retorna nada, por isso não usamos um parâmetro do tipo que estamos retornando aqui
        //essa é a principal diferença entre um Command e uma Query
        //Querys retornam data, Command Não
        public class Command : IRequest<Result<Unit>>
        {
            //Usaremos a Activity como seu parâmetro para passar um objeto da Activity
            //Para o Handler quando o criarmos
            //Isso que vamos querer receber como parâmetro da nossa API
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            //Precisamos inserir a DataContext dentro desse Constructor
            // para gravar alterações
            private readonly IUserAccessor _userAccessor;

            //_context é um objeto concreto da classe DataContext que vai ser utilizado dentro dessa classe Handler
            //para acessar o Banco de Dados
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var attendee = new ActivityAttendee {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true
                };

                request.Activity.Attendees.Add(attendee);

                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}