import { Request, Response } from 'express';
import { addCard, incrementMainCount, decrementMainCount, incrementExtraCount, decrementExtraCount } from '../models/cardModel';

async function getCardsFromPlace(req: Request, res: Response): Promise<void> {

    //Requests spotify for a song using a song title and the artist
    const result = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`, {
      method: 'GET',
    });
  
    if (!result.ok) {
      console.log(res.status);
    }
  
    const response = await result.json();
    const data = response.data;
    console.log(data);
  
    //Breaking down information for song to be added to database
    for(let i = 0; i < data.length; i++){
      const {  id, type, name } = data[i] as cardBody;
      console.log(name, type, id);
      await addCard(name, type, id);
    }
  
  
  
    res.redirect('/');
  
  }

  async function incrementMain(req: Request, res: Response): Promise<void> {

    const { cardName } = req.body as {cardName: string};

    await incrementMainCount(cardName);

    res.redirect('/');
  
  }

  async function decrementMain(req: Request, res: Response): Promise<void> {

    const { cardName } = req.body as {cardName: string};

    await decrementMainCount(cardName);

    res.redirect('/');
  
  }


  async function incrementExtra(req: Request, res: Response): Promise<void> {

    const { cardName } = req.body as {cardName: string};

    await incrementExtraCount(cardName);

    res.redirect('/');
  
  }

  async function decrementExtra(req: Request, res: Response): Promise<void> {

    const { cardName } = req.body as {cardName: string};

    await decrementExtraCount(cardName);

    res.redirect('/');
  
  }
  

export {getCardsFromPlace, incrementMain, decrementMain, incrementExtra, decrementExtra};