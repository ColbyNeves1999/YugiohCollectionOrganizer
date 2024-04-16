import { AppDataSource } from '../dataSource';
import { Card } from '../entities/cards';

const cardRepository = AppDataSource.getRepository(Card);

async function addCard(name: string, type: string, id: number): Promise<Card> {

    const temp = await getCard(name);
  
    if(!temp){

    // Create the new card object and saves all the incoming data for it
    let newCard = new Card();
    newCard.name = name;
    newCard.type = type;
    newCard.konamiId = id;
  
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

async function incrementMainCount(cardName:string): Promise<void> {

  let specificCard = await getCard(cardName);

  specificCard.copiesInCollection = specificCard.copiesInCollection + 1;

  specificCard = await cardRepository.save(specificCard);
  
}

async function decrementMainCount(cardName:string): Promise<void> {

  let specificCard = await getCard(cardName);

  if(specificCard.copiesInCollection !== 0){
    specificCard.copiesInCollection = specificCard.copiesInCollection - 1;
  }

  specificCard = await cardRepository.save(specificCard);
  
}

async function incrementExtraCount(cardName:string): Promise<void> {

  let specificCard = await getCard(cardName);

  specificCard.totalCopies = specificCard.totalCopies + 1;

  specificCard = await cardRepository.save(specificCard);
  
}

async function decrementExtraCount(cardName:string): Promise<void> {

  let specificCard = await getCard(cardName);

  if(specificCard.totalCopies !== 0){
    specificCard.totalCopies = specificCard.totalCopies - 1;
  }

  specificCard = await cardRepository.save(specificCard);
  
}

async function getAllCards(): Promise<Card[]> {

  const card = await cardRepository.find();

  card.sort((a, b) => {
    // First, sort by type
    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    // If types are equal, sort by name
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;

  });

  console.log(card.length);

  return card;

}

export { addCard, getCard, getAllCards, incrementMainCount, decrementMainCount, incrementExtraCount, decrementExtraCount };