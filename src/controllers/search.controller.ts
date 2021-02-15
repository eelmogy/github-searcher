import { NextFunction, Request, Response } from 'express';
import GithubHelper from '../helpers/github-helper';
import Redis from '../helpers/redis-helper';

class SearchController {

    public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let results: any;
            let searchTerm: any = req.query.search;
            let type: any = req.query.type;
            let source: String;
            let redis: any = await Redis.get(`${type}:${searchTerm}`);

            if (redis.isCatched) {
                results = redis.data;
            } else {
                if (type === 'user') {
                    let res = await GithubHelper.searchUsers(searchTerm);
                    results = res.data;
                    Redis.catch(`${type}:${searchTerm}`, results);
                }

                if (type == 'repo') {
                    let res = await GithubHelper.searchRepos(searchTerm);
                    results = res.data.items;
                    Redis.catch(`${type}:${searchTerm}`, results);
                }
            }


            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    };

    public clearCache = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Redis.flush();

            res.status(200).json({ message: 'Cached cleaned.' });
        } catch (error) {
            next(error);
        }
    };

}

export default SearchController;
