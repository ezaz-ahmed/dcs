import { writable } from "svelte/store"

export const token = writable<string>('')
export const isAuthenticated = writable<boolean>(false)