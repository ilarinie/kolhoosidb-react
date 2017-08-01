import { observable } from 'mobx';
import createBrowserHistory from '../history' 

export class AppState {
    @observable timer = 0;
    @observable loggedIn: boolean = localStorage.getItem('token') !== null;
    @observable selectedCommune: any = null;
    @observable communes = [
      "feikki1",
      "feikki2"
    ]
  
  
    constructor() {
      setInterval(() => {
        this.timer += 1;
      }, 1000);
    }
  
    selectCommune = (id: number): boolean => {
      if (this.communes[id] !== null) {
        this.selectedCommune = this.communes[id];
        createBrowserHistory.push('/')
      }
      return false;
    }
  
    logIn = () => {
      localStorage.setItem('token', "asd")
      this.loggedIn = true;
      createBrowserHistory.push('/communelist')
    }

    logOut = () => {
        localStorage.removeItem('token')
        this.loggedIn = false;
        createBrowserHistory.push('/login')
    }
  
    resetTimer = () => {
      this.timer = 0;
    }
  }