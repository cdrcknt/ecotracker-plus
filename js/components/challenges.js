export class ChallengeSystem {
    constructor() {
        this.challenges = [
            {
                id: 1,
                title: "Use reusable water bottle",
                points: 50,
                description: "Use a reusable water bottle all day"
            },
            {
                id: 2,
                title: "Bike commute",
                points: 100,
                description: "Choose bicycle over car for commuting"
            }
        ];
    }

    completeChallenge(id) {
        const challenge = this.challenges.find(c => c.id === id);
        if (challenge) {
            return {
                points: challenge.points,
                message: `Completed: ${challenge.title}`
            };
        }
    }
}