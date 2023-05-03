using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //quando fizer esse request vai ao  //api//activities/aasuidnasd < usará isso como id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
        //Aqui, o atributo [HttpPost] indica que o método só será acionado quando uma
        //requisição HTTP do tipo POST for enviada para a URL correspondente. 
        [HttpPost]
        //Além disso, o método recebe como parâmetro um objeto do tipo Activity.
        public async Task<IActionResult> CreateActivity(Activity activity){
            //Essa linha de código cria uma nova instância da classe Create.Command, 
            //passando activity como parâmetro para o construtor do comando. 
            //Em seguida, o método envia o comando para o Mediator e aguarda a resposta.
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
            //o método retorna uma resposta HTTP com o status 200 OK,
            // indicando que a requisição foi processada com sucesso.
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            
            activity.Id = id;

            return Ok(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){

            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}