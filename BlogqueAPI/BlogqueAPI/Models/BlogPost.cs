using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BlogqueAPI.Models
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        [DataType(DataType.Date)]
        public DateTime PublishDate { get; set; }
        [DefaultValue("https://tse2.mm.bing.net/th?id=OIP.wsVlPGCwZ8_WwYZmtpKbAAHaCZ&pid=Api&P=0")]
        public string? ImageURL { get; set; }
        public string? Category { get; set; }

        public int AuthorId { get; set; }
        public User? Author { get; set; }
    }
}
