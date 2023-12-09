package api

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
)

type Response struct {
	StatusCode int
	Msg        []byte
	Error      error
}

type HttpClientInterface interface {
	makeRequest(method, fullURL string, body interface{}) (*Response, error)
	Post(fullURL string, body interface{}) (*Response, error)
	Get(fullURL string, body interface{}) (*Response, error)
	Put(fullURL string, body interface{}) (*Response, error)
	Delete(fullURL string, body interface{}) (*Response, error)
}

type HTTPClient struct {
	client *http.Client
}

// NewHTTPClient creates a new HTTPClient
func NewHTTPClient() HttpClientInterface {
	return &HTTPClient{
		client: &http.Client{},
	}
}

func (c *HTTPClient) makeRequest(method, fullURL string,
	body interface{}) (*Response, error) {

	var buf bytes.Buffer
	if body != nil {
		err := json.NewEncoder(&buf).Encode(body)

		if err != nil {
			return nil, err
		}
	}

	value, err := url.Parse(fullURL)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(method, value.String(), &buf)
	if err != nil {
		return nil, err
	}
	req.Header.Set("accept", "application/json")
	req.Header.Set("Content-Type", "application/json; charset=utf-8")

	if err != nil {
		return nil, err
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	bodyBytes, readErr := io.ReadAll(resp.Body)
	if readErr != nil {
		return nil, readErr
	}

	return &Response{
		StatusCode: resp.StatusCode,
		Msg:        bodyBytes,
		Error:      nil,
	}, nil
}

func (c *HTTPClient) Post(fullURL string, body interface{}) (*Response,
	error) {
	response, err := c.makeRequest("POST", fullURL, body)

	if err != nil {
		return nil, err
	}
	return response, nil
}

// Get makes a GET request
func (c *HTTPClient) Get(fullURL string, body interface{}) (*Response, error) {
	response, err := c.makeRequest("GET", fullURL, body)
	if err != nil {
		return nil, err
	}
	return response, nil
}

// Put makes a PUT request
func (c *HTTPClient) Put(fullURL string, body interface{}) (*Response, error) {
	response, err := c.makeRequest("PUT", fullURL, body)
	if err != nil {
		return nil, err
	}
	return response, nil
}

// Delete makes a DELETE request
func (c *HTTPClient) Delete(fullURL string, body interface{}) (*Response,
	error) {
	response, err := c.makeRequest("DELETE", fullURL, body)
	if err != nil {
		return nil, err
	}
	return response, nil
}
