using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //quando fizer esse request vai ao  //api//activities/aasuidnasd < usará isso como id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
            
        }
        //Aqui, o atributo [HttpPost] indica que o método só será acionado quando uma
        //requisição HTTP do tipo POST for enviada para a URL correspondente. 
        [HttpPost]
        //Além disso, o método recebe como parâmetro um objeto do tipo Activity.
        public async Task<IActionResult> CreateActivity(Activity activity){
            
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            
            activity.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){

            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}