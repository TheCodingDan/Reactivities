using Application.Core;

namespace Application.Activities
{
    public class ActivityParams : PagingParams
    {
        public Boolean isGoing { get; set; }
        public Boolean isHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}