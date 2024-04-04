import { AppDataSource } from '../dataSource';
import { Card } from '../entities/cards';

const cardRepository = AppDataSource.getRepository(Card);

async function addCard(name: string, type: string): Promise<Card> {

    const temp = await getCard(name);
  
    if(!temp){

    // Create the new card object and saves all the incoming data for it
    let newCard = new Card();
    newCard.name = name;
    newCard.type = type;
  
    newCard = await cardRepository.save(newCard);
    return newCard;
    }
  
    console.log("already here");
    return null;
  
}
  
  async function getCard(name: string): Promise<Card | null> {
    const ID = await cardRepository.findOne({ where: { name } });
    return ID;
  }

  export { addCard, getCard };