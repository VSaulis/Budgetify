using System.Linq;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class InvitationRepository : BaseRepository<Invitation, InvitationsFilter>, IInvitationRepository
    {
        public InvitationRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Invitation> FormatQuery(IQueryable<Invitation> query)
        {
            return query.Include(invitation => invitation.Group);
        }
    }
}