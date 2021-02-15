import { Octokit } from "@octokit/rest";

class GithubHelper {
	client: any
	constructor() {
		this.client = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
	}

	async searchUsers(searchTerm: String) {
		return this.client.search.users({ q: searchTerm });
	}

    async searchRepos(searchTerm: String) {
        return this.client.search.repos({ q: searchTerm });
    }
}

export default new GithubHelper();
