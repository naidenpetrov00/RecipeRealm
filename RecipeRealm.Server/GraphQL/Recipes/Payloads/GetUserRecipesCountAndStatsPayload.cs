namespace RecipeRealm.Server.GraphQL.Recipes.Payloads
{
    public record GetUserRecipesCountAndStatsPayload
    {
        public int RecipesCount { get; set; }

        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        public int SavesCount { get; internal set; }
    }
}