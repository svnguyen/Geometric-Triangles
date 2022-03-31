namespace GeometricTriangleApplication.Utility
{
    /// <summary>
    /// Utility class for calculating triangles and vertices
    /// </summary>
    public static class TriangleCalculator
    {
        /// <summary>
        /// Returns a triangle object containing three vertices
        /// </summary>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        public static Triangle CalculateVertices(int row, int column)
        {
            Triangle triangle = new Triangle();

            if (column % 2 == 0) // Even Column Triangle
            {
                triangle.vertices1 = new List<int> { (row - 1) * 10, column / 2 * 10 };
                triangle.vertices2 = new List<int> { (row - 1) * 10, ((column / 2) - 1) * 10 };
                triangle.vertices3 = new List<int> { row * 10, column / 2 * 10 };
            }
            else // Odd Column Triangle
            {
                triangle.vertices1 = new List<int> { row * 10, (column - 1) / 2 * 10 };
                triangle.vertices2 = new List<int> { (row - 1) * 10, (column - 1) / 2 * 10 };
                triangle.vertices3 = new List<int> { row * 10, (((column - 1) / 2) + 1) * 10 };
            }

            return triangle;
        }

        /// <summary>
        /// Returns a list containing the row and column value of a triangle.
        /// This method will return the row and column values for a right triangle as displayed in the coding question.
        /// That is, as long as vertex 1 is the right angle, vertex 2 is the angle on top, and vertex 3 is the angle on the right.
        /// </summary>
        /// <param name="triangle"></param>
        /// <returns></returns>
        public static List<string> CalculateRowAndColumn(Triangle triangle)
        {
            List<string> rowAndColumn = new List<string>();

            string row = Enum.GetName(typeof(Row), triangle.vertices1[0]);
            string column = (2 * (triangle.vertices3[1] / 10) - 1).ToString();

            if (row != null && column != null)
            {
                rowAndColumn.Add(row);
                rowAndColumn.Add(column);
            }

            return rowAndColumn;
        }

        /// <summary>
        /// Validates if three vertices form a right triangle
        /// </summary>
        /// <param name="triangle"></param>
        /// <returns></returns>
        public static bool ValidateTriangleIsRightTriangle(Triangle triangle)
        {
            int distance1 = triangle.vertices1[0] - triangle.vertices2[0];
            int distance2 = triangle.vertices2[1] - triangle.vertices3[1];

            int distance3x = triangle.vertices3[0] - triangle.vertices2[0];
            int distance3y = triangle.vertices3[1] - triangle.vertices2[1];
            double distance3 = Math.Sqrt((distance3x * distance3x) + (distance3y * distance3y));

            // Formula for a right triangle
            if ((distance1 * distance1) + (distance2 * distance2) == Math.Round(distance3 * distance3))
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Validates if the right triangle is the correct size.
        /// Since there could be a right triangle of varying sizes, this method will check if the right triangle
        /// dimension is the correct size for a row/column combination.
        /// </summary>
        /// <param name="triangle"></param>
        /// <returns></returns>
        public static bool ValidateTriangleSize(Triangle triangle)
        {
            int distance1 = triangle.vertices1[0] - triangle.vertices2[0];
            int distance2 = triangle.vertices1[1] - triangle.vertices3[1];

            // The area of a right triangle in the example is 50 pixels
            if (Math.Abs(distance1 * distance2 / 2) == 50)
            {
                return true;
            }

            return false;
        }
    }
}
