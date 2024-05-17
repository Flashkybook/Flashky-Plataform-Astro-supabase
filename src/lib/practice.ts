import dayjs from 'dayjs';
import { supermemo } from 'supermemo';
import type { SuperMemoGrade } from 'supermemo';
import type { SPB_FlashCard } from '@env'


const getGradeFromFails = (flashcard: SPB_FlashCard): SuperMemoGrade => {
  // return grade is equal to the number of failures menos 5
  //   grade:
  // 5: perfect response. (0 fails)
  // 4: correct response after a hesitation.
  // 3: correct response recalled with serious difficulty.
  // 2: incorrect response; where the correct one seemed easy to recall.
  // 1: incorrect response; the correct one remembered.
  // 0: complete blackout. 5 fails

  if (flashcard.fails <= 5) return 5 - flashcard.fails as SuperMemoGrade
  return 0
}


export default function practice(flashcard: SPB_FlashCard): SPB_FlashCard {

  const { interval, repetition, efactor } = supermemo(flashcard, getGradeFromFails(flashcard));


  if (flashcard.last_review !== new Date().toISOString()) {
    console.log("Primera repetición del dia")
    flashcard.last_review = new Date().toISOString();
    const next_review = dayjs(Date.now()).add(interval, 'day').toISOString();
    return { ...flashcard, interval, repetition, efactor, next_review };
  } else {
    console.log("esta carta ya fue repetida hoy")

    return { ...flashcard, interval, repetition };

  }
}