import { Request, Response } from 'express';
import { addCard } from '../models/cardModel';

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

export {getCardsFromPlace};