"""
Script to auto-form teams from unassigned users based on expertise.
- Each team up to `MAX_TEAM_SIZE` members.
- Each team should have at least `MIN_CODERS` Coders.
- Expertise categories: 'Coder', 'Designer', 'Social Scientist', 'Business'.
"""
import random
from app import create_app
from models import db, User, Team, TeamMember

# Configuration
MAX_TEAM_SIZE = 5
MIN_CODERS = 2
EXPERTISE_CATEGORIES = ['Coder', 'Designer', 'Social Scientist', 'Business']


def form_teams(max_size=MAX_TEAM_SIZE, min_coders=MIN_CODERS):
    app = create_app()
    with app.app_context():
        # Fetch users not yet in any team
        subquery = db.session.query(TeamMember.user_id)
        unassigned = User.query.filter(~User.id.in_(subquery)).all()
        if not unassigned:
            print("No unassigned users found.")
            return

        # Group users by expertise
        buckets = {cat: [] for cat in EXPERTISE_CATEGORIES}
        buckets['Other'] = []
        for user in unassigned:
            if user.expertise in EXPERTISE_CATEGORIES:
                buckets[user.expertise].append(user)
            else:
                buckets['Other'].append(user)

        teams = []

        # While there are unassigned users, form a new team
        while any(buckets.values()):
            team_members = []
            # 1. Ensure minimum coders
            for _ in range(min_coders):
                if buckets['Coder']:
                    team_members.append(buckets['Coder'].pop())
            # 2. Fill from other expertise categories one each
            for cat in EXPERTISE_CATEGORIES:
                if len(team_members) >= max_size:
                    break
                if cat != 'Coder' and buckets.get(cat):
                    team_members.append(buckets[cat].pop())
            # 3. Fill remaining slots with coders if available
            while len(team_members) < max_size and buckets['Coder']:
                team_members.append(buckets['Coder'].pop())
            # 4. Fill any remaining slots with "Other"
            all_remaining = []
            for cat, users in buckets.items():
                all_remaining.extend(users)
            random.shuffle(all_remaining)
            while len(team_members) < max_size and all_remaining:
                member = all_remaining.pop()
                team_members.append(member)
                # Remove from its bucket
                buckets.get(member.expertise, buckets['Other']).remove(member)

            # Register the new team
            teams.append(team_members)

            # Clear out emptied buckets
            for cat in list(buckets.keys()):
                buckets[cat] = [u for u in buckets[cat] if u not in team_members]

        # Persist teams to the database
        for idx, members in enumerate(teams, start=1):
            team = Team(
                name=f"AutoTeam {idx}",
                description="Automatically formed team"
            )
            db.session.add(team)
            db.session.flush()  # get team.id
            for member in members:
                tm = TeamMember(team_id=team.id, user_id=member.id)
                db.session.add(tm)
        db.session.commit()

        print(f"Formed {len(teams)} teams with up to {max_size} members each.")


if __name__ == '__main__':
    form_teams()
