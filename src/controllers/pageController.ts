import { Request, Response } from 'express';

function indexPage(req: Request, res: Response) {

    res.render("mainPage");

};

export { indexPage };