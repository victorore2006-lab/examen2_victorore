using System.Security.Claims;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class IdeaController : ControllerBase
{
    private readonly IdeaService _ideaService;

    public IdeaController(IdeaService ideaService)
    {
        _ideaService = ideaService;
    }


    [HttpPost]
    public async Task<IActionResult> CreateIdea([FromBody] CreateIdeaDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("No se pudo obtener el usuario desde el token");
        }

        var idea = await _ideaService.CreateIdeaAsync(dto, userId);

        return Ok(idea);
    }

    [HttpGet]
    public async Task<IActionResult> GetIdeas()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("No se puede obtener el usuario desde el token");
        }

        var ideas = await _ideaService.GetIdeasByUserAsync(userId);

        return Ok(ideas);
    }
}