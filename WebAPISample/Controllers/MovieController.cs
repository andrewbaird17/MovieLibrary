using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;


namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            var moviesArray = _context.Movies.ToArray();
            return moviesArray;
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            var value = _context.Movies.Find(id);
            return value;
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }

        // PUT api/movie/5
        [HttpPut]
        public void Put([FromBody]Movie movie)
        {
            var newMovie = _context.Movies.Where(a => a.MovieId == movie.MovieId).SingleOrDefault();

            newMovie.Title = movie.Title;
            newMovie.Genre = movie.Genre;
            newMovie.Director = movie.Director;
            _context.SaveChanges();
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete([FromBody]Movie movie)
        {
            _context.Movies.Remove(movie);
            _context.SaveChanges();
        }
    }
}