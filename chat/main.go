package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"text/template"

	"github.com/Luckny/go-tracer"
)

// https://pkg.go.dev/sync#Once

// Usefull to load the templates only once
type templateHandler struct {
	once     sync.Once
	filename string
	// tmpl represents a single template
	tmpl *template.Template
}

// handle the http request
func (t *templateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	t.once.Do(func() {
		// load the template once
		t.tmpl = template.Must(template.ParseFiles(filepath.Join("templates", t.filename)))
	})

	t.tmpl.Execute(w, r)
}

func main() {
	addr := flag.String("addr", ":4000", "Http server port")
	flag.Parse()

	// create the websocket room
	r := newRoom()
	r.tracer = tracer.New(os.Stdout)

	// TODO: remove
	http.Handle("/chat", &templateHandler{filename: "chat.html"})

	http.Handle("/room", MustAuth(r))

	// start the room
	go r.run()

	// start the web server
	log.Println("Starting the web server on", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
