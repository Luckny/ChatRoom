package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/Luckny/LinkUp/config"
	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/Luckny/LinkUp/pkg/handler"
	"github.com/go-chi/chi"
)

func main() {
	addr := flag.String("addr", ":8080", "Server address")
	flag.Parse()

	sessionStore := auth.NewCoockieStore(auth.SessionsOptions{
		Key:      config.Envs.CookieSecret,
		MaxAge:   config.Envs.CookieAge,
		HttpOnly: config.Envs.CookieIsHttpOnly,
		Secure:   config.Envs.CoockieIsSecure,
	})

	authService := auth.NewAuthService(sessionStore)
	handler := handler.New(authService)
	// link up room
	room := newRoom()
	// our chi router
	router := chi.NewRouter()

	// web socket route
	router.Handle("/linkup", auth.MustAuth(room, authService))

	// auth routes
	router.Get("/auth/{provider}", handler.HandleLogin)
	router.Get("/auth/{provider}/callback", handler.HandleAuthCallback)
	router.Get("/user", handler.GetUser)

	// start the room
	go room.run()

	log.Println("Server listening on port", *addr)
	err := http.ListenAndServe(*addr, router)
	if err != nil {
		log.Fatal("Error on listen and serve.")
	}
}
