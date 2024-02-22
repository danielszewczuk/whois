from flask import Blueprint, jsonify, request
import socket
import re

api = Blueprint("api", __name__)

@api.route('/')
def index():
    return jsonify("Welcome to the WHOIS API.")

@api.route('/query', methods=["POST"])
def query():
    domain = request.json.get('domain')
    def find_whois_server(domain, server=f"whois.iana.org", port=43):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        try:
            sock.connect((server, port))
            sock.sendall(f"{domain}\r\n".encode())
            response = b""
            while True:
                data = sock.recv(1024)
                if not data:
                    break
                response += data
            text = response.decode()
        except socket.timeout:
            return "Timeout"
        except Exception as e:
            return e
        finally:
            sock.close()
        regex = r"whois:\s+(\S+)"
        matches = re.findall(regex, text)

        if matches:
            whois_server = matches[0]
            return whois_server
        else:
            return "Unkown WHOIS server"


    def query(domain):
        whois_server = find_whois_server(domain)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        try:
            sock.connect((whois_server, 43))
            sock.sendall(f"{domain}\r\n".encode())
            response = b""
            while True:
                data = sock.recv(1024)
                if not data:
                    break
                response += data
            text = response.decode()
        except socket.timeout:
            return "Timeout"
        except Exception as e:
            return e
        finally:
            sock.close()
        return text

    return jsonify(query(domain))