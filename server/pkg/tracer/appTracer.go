package tracer

import (
	"os"

	"github.com/Luckny/go-tracer"
)

func setTracer(tracing bool) tracer.Tracer {
	t := tracer.New(os.Stdout)
	if !tracing {
		t = tracer.Off()
	}
	return t
}

var appTracer = setTracer(true)

func Trace(a ...interface{}) {
	appTracer.Trace(a...)
}
