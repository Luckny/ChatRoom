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
	// chatRoom := chat.NewChatRoom()
	handler := handler.New(authService)
	// handler.Add(chatRoom)
	router := chi.NewRouter()

	withCors := handler.WithCors

	// Authenticate user
	router.Get("/auth/{provider}", handler.HandleLogin)
	router.Get("/auth/{provider}/callback", handler.HandleAuthCallback)

	// Authentification required
	router.Get("/user", withCors(auth.MustAuth(handler.GetUser, authService)))
	// TODO: change urls
	router.Get("/test", withCors(auth.MustAuth(handler.ListRooms, authService)))
	router.Post("/test", withCors(auth.MustAuth(handler.CreateChatRoom, authService)))
	router.Handle("/linkup", withCors(auth.MustAuth(handler.HandleChatRoom, authService)))
	router.Get("/logout/{provider}", withCors(auth.MustAuth(handler.HandleLogout, authService)))

	// start the room
	// go chatRoom.Run()

	log.Println("Server listening on port", *addr)
	err := http.ListenAndServe(*addr, router)
	if err != nil {
		log.Fatal("Error on listen and serve.")
	}
}
