package main

import (
	"flag"
	"log"
	"net/http"
	"path/filepath"
	"sync"
	"text/template"
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

	t.tmpl.Execute(w, nil)
}

func main() {
	addr := flag.String("addr", ":4000", "Http server port")
	flag.Parse()

	http.Handle("/", &templateHandler{filename: "chat.html"})

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
