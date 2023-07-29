import { writable } from "svelte/store"

export const adminToken = writable<string>('')
export const adminAuthenticated = writable<boolean>(false)