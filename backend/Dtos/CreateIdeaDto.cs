namespace backend.Dtos;


// aqui no va ir el userId porque segun el examen el userId se debe sacar del token
public class CreateIdeaDto
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;
}