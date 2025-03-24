import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  respostas:string[] = []
  respostaSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string){
    this.respostas.push(value)
    this.nextStep()


  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalResposta:string = await this.checkResult(this.respostas)
      this.finished = true
      this.respostaSelected = quizz_questions.results[finalResposta as keyof typeof quizz_questions.results]

      console.log(this.respostas)
    }
  }

  async checkResult(respostas:string[]){
    const result = respostas.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >

        arr.filter(item => item === current).length
      ){
        console.log(previous);
        return previous
      }else{
        console.log(previous);
        return current
      }
    })

    return result
  }

  restartQuiz() {
    this.finished = false;
    this.questionIndex = 0;
    this.respostas = [];
    this.respostaSelected = "";
    this.questionSelected = this.questions[this.questionIndex];
  }
}
