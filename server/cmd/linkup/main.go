package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/go-chi/chi"
)

func main() {
	addr := flag.String("addr", ":8080", "Server address")
	flag.Parse()

	auth.InitiateAuth()

	// link up room
	room := newRoom()
	// our chi router
	router := chi.NewRouter()

	// web socket route
	router.Handle("/linkup", auth.MustAuth(room))
	// auth routes
	router.Get("/auth/{action}/{provider}", auth.LoginHandler)

	log.Println("Server listening on port", *addr)
	err := http.ListenAndServe(*addr, router)
	if err != nil {
		log.Fatal("Error on listen and serve.")
	}
}
