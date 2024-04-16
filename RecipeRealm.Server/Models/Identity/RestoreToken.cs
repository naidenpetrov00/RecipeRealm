namespace RecipeRealm.Server.Models.Identity
{
    public class RestoreToken
    {
        public DateTime ValidUntil { get; set; }
        public int Value { get; set; }
    }
}
