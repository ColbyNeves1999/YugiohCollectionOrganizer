import { Request, Response } from 'express';
import { getAllCards } from '../models/cardModel';

async function indexPage(req: Request, res: Response): Promise<void>  {

    const cards = await getAllCards();
    const cardLength = cards.length;

    res.render('mainPage', { cards, cardLength });
    //res.render("mainPage");

};

export { indexPage };