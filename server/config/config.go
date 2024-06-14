package config

import (
	"log"
	"os"
	"strconv"

	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/joho/godotenv"
)

type Config struct {
	// Auth
	GoogleClientId     string
	GoogleClientSecret string

	// Cookie
	CookieSecret string
	// set in seconds
	CookieAge        int
	CoockieIsSecure  bool
	CookieIsHttpOnly bool
}

const oneDayInSeconds = 60 * 60 * 24

var Envs = initConfig()

func initConfig() Config {
	// load env variables from .env in path
	err := godotenv.Load()
	if err != nil {
		log.Fatalln("Error loading env file", err)
	}

	return Config{
		GoogleClientId:     os.Getenv("GOOGLE_CLIENT_ID"),
		GoogleClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),

		CookieSecret:     getEnv("COOKIE_SECRET", "A3256DCEEF11B26457FB1E8779552"),
		CookieAge:        getEnvAsInt("COOKIE_AGE", oneDayInSeconds),
		CoockieIsSecure:  getEnvAsBool("COOCKIE_IS_SECURE", true),
		CookieIsHttpOnly: getEnvAsBool("COOKIE_IS_HTTP_ONLY", true),
	}
}

func getEnv(key string, fallback string) string {
	value, found := os.LookupEnv(key)
	if !found {
		tracer.Trace("Env key ", key, " not found. (Using fallback: ", fallback, ")")
		return fallback
	}

	return value
}

func getEnvAsInt(key string, fallback int) int {
	value, found := os.LookupEnv(key)

	if !found {
		tracer.Trace("Env key ", key, " not found. (Using fallback: ", fallback, ")")
		return fallback
	}

	intValue, err := strconv.Atoi(value)

	if err != nil {
		tracer.Trace("Could not convert ", value, " to int. (Using fallback: ", fallback, ")")
		return fallback
	}
	return intValue
}

func getEnvAsBool(key string, fallback bool) bool {
	value, found := os.LookupEnv(key)

	if !found {
		tracer.Trace("Env key ", key, " not found. (Using fallback: ", fallback, ")")
		return fallback
	}

	boolValue, err := strconv.ParseBool(value)

	if err != nil {
		tracer.Trace("Could not convert ", value, " to bool. (Using fallback: ", fallback, ")")
		return fallback
	}
	return boolValue
}
