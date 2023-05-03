using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //Command não retorna nada, por isso não usamos um parâmetro do tipo que estamos retornando aqui
        //essa é a principal diferença entre um Command e uma Query
        //Querys retornam data, Command Não
        public class Command : IRequest
        {
            //Usaremos a Activity como seu parâmetro para passar um objeto da Activity
            //Para o Handler quando o criarmos
            //Isso que vamos querer receber como parâmetro da nossa API
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            //Precisamos inserir a DataContext dentro desse Constructor
            // para gravar alterações

            //_context é um objeto concreto da classe DataContext que vai ser utilizado dentro dessa classe Handler
            //para acessar o Banco de Dados
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}