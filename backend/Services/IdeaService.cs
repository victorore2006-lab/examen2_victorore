using backend.Dtos;
using backend.Models;
using Google.Cloud.Firestore;

namespace backend.Services;


// aqui vamos a crear una idea y vamos a listar ideas del usuario autenticado 
public class IdeaService
{
    private readonly FirebaseService _firebaseService;
    private const string CollectionName = "ideas";

    public IdeaService(FirebaseService firebaseService)
    {
        _firebaseService = firebaseService;
    }

    public async Task<Idea> CreateIdeaAsync(CreateIdeaDto dto, string userId)
    {
        var idea = new Idea
        {
            Id = Guid.NewGuid().ToString(),
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        var data = new Dictionary<string, object>
        {
            { "id", idea.Id },
            { "title", idea.Title },
            { "description", idea.Description },
            { "category", idea.Category },
            { "userId", idea.UserId },
            { "createdAt", Timestamp.FromDateTime(idea.CreatedAt) }
        };

        await _firebaseService
            .GetCollection(CollectionName)
            .Document(idea.Id)
            .SetAsync(data);

        return idea;
    }

    public async Task<List<Idea>> GetIdeasByUserAsync(string userId)
    {
        var snapshot = await _firebaseService
            .GetCollection(CollectionName)
            .WhereEqualTo("userId", userId)
            .GetSnapshotAsync();

        var ideas = new List<Idea>();

        foreach (var document in snapshot.Documents)
        {
            var data = document.ToDictionary();

            var idea = new Idea
            {
                Id = data.ContainsKey("id") ? data["id"].ToString()! : document.Id,
                Title = data.ContainsKey("title") ? data["title"].ToString()! : string.Empty,
                Description = data.ContainsKey("description") ? data["description"].ToString()! : string.Empty,
                Category = data.ContainsKey("category") ? data["category"].ToString()! : string.Empty,
                UserId = data.ContainsKey("userId") ? data["userId"].ToString()! : string.Empty,
                CreatedAt = data.ContainsKey("createdAt")
                    ? ((Timestamp)data["createdAt"]).ToDateTime()
                    : DateTime.MinValue
            };

            ideas.Add(idea);
        }

        return ideas;
    }
}