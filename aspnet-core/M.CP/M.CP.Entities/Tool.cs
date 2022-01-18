namespace M.CP.Entities
{
    public class Tool
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
