using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface IInvitationRepository : IBaseRepository<Invitation, InvitationsFilter>
    {
    }
}