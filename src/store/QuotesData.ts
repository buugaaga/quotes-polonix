import { action, makeAutoObservable } from "mobx";
import { fetchTicker } from "../agent";
import { TickerType } from "../types";

export class QuotesData {
  quotes: Map<string, TickerType> = new Map()
  state: "pending" | "done" | "error" = "pending"
  errorMessage: any
  modalInfo: TickerType | null = null

  constructor() {
    makeAutoObservable(this)
  }

  showModal(modalInfo: TickerType) {
    this.modalInfo = modalInfo; 
  }

  closeModal() {
    this.modalInfo = null
  }

  fetchQuotesData() {
    if (this.quotes.size === 0) {
      this.state = 'pending'
    }

    fetchTicker<Record<string, TickerType>>().then(
      action('fetchSuccess', response => {
        this.quotes = new Map(Object.entries(response.data))
        this.state = 'done'
      })).catch(
        action('fetchError', (error: any) => {
          this.state = 'error'
          this.errorMessage = error.message
        })
      )
  }
}