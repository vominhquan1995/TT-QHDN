namespace HuRe.Models.ActionModel
{
    public class FilterPageActionModel
    {
        public int CurrentPage { get; set; }
        public int NumberItemPage { get; set; }
        public int IsActivated { get; set; }
        public int RoleId { get; set; }
        public string KeySearch { get; set; }
        public string Status { get; set; }
        public long JobGroup_Id { get; set; }
        public long Company_Id { get; set; }
        public long Worktype_Id { get; set; }
        public int IsPartner { get; set; }
    }
}