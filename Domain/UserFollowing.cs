namespace Domain
{
    public class UserFollowing
    {
        public AppUser Observer { get; set; }
        public string ObserverId { get; set; }
        public AppUser Target { get; set; }
        public string TargetId { get; set; }
    }
}