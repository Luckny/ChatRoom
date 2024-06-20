package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/Luckny/LinkUp/config"
	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/Luckny/LinkUp/pkg/chat"
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
	chatService := chat.NewChatService()
	handler := handler.New(authService, chatService)
	router := chi.NewRouter()

	// Authenticate user
	router.Get("/auth/{provider}", handler.HandleLogin)
	router.Get("/auth/{provider}/callback", handler.HandleAuthCallback)

	// Authentification required
	router.Get("/user", auth.MustAuth(handler.GetUser, authService))
	router.Handle("/linkup", auth.MustAuth(handler.HandleChatRoom, authService))
	router.Get("/logout/{provider}", auth.MustAuth(handler.HandleLogout, authService))

	// start the room
	go chatService.Run()

	log.Println("Server listening on port", *addr)
	err := http.ListenAndServe(*addr, router)
	if err != nil {
		log.Fatal("Error on listen and serve.")
	}
}
