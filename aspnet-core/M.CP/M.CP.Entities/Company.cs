namespace M.CP.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public int? ProjectId { get; set; }
        public Project Project { get; set; }

    }
}
