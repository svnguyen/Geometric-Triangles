using GeometricTriangleApplication.Utility;
using Microsoft.AspNetCore.Mvc;

namespace GeometricTriangleApplication.Controllers
{
    [ApiController]
    [Route("api/GeometricTriangle")]
    public class GeometricTriangleController : ControllerBase
    {
        /// <summary>
        /// Returns a triangle object containing the three vertices
        /// </summary>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetVertices")]
        public Triangle GetVertices(int row, int column)
        {
            Triangle triangle = TriangleCalculator.CalculateVertices(row, column);

            return triangle;
        }

        /// <summary>
        /// Returns a list containing the row and column value of a triangle
        /// </summary>
        /// <param name="triangle"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetRowAndColumn")]
        public List<string> GetRowAndColumn([FromBody] Triangle triangle)
        {
            List<string> rowAndColumn = new List<string>();

            if (TriangleCalculator.ValidateTriangleIsRightTriangle(triangle) && TriangleCalculator.ValidateTriangleSize(triangle))
            {
                rowAndColumn = TriangleCalculator.CalculateRowAndColumn(triangle);
            }

            return rowAndColumn;
        }
    }
}