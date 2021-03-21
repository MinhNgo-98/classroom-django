# Classroom App
## Beschreibung
Diese Webanwendung ist mein Abschlussprojekt für den HarvardX **CS50 Web Programming with Python and JavaScript Kurs**. Die Klassenraum-App ermöglicht es Lehrern, Aufgaben, Hausaufgaben und die Schüler ihrer Klasse zu verwalten und zu organisieren.

## Link zur Website
https://classroom-django.herokuapp.com/

## So wird die App lokal ausgeführt
1. Öffnen Sie das Terminal.
2. Terminal: 
    - `python .\manage.py runserver`
    - Klicken Sie auf den localhost-Link, um die App lokal auszuführen.
    - Verwenden Sie zum Login die folgenden Anmeldedaten:
      - username: test
      - Kennwort: 123456

## Struktur
### Backend
Für das Backend wurde Django verwendet und beinhaltet folgende Spezifikationen:
  - es enthält eine Django-App namens api (Pfad: ./api), die alle 3 Modelle für die App enthält (Hausaufgaben, Todo und Schüler)
  - das django-rest-framework wurde verwendet, um benutzerdefinierte REST api's zu erstellen, damit die React-App im Frontend über HTTP-Requests auf die django-Datenbank zugreifen kann
  - die Datei serializer.py (Pfad: ./api/serializers.py) ermöglicht die Konvertierung von Querysets und Model-Instanzen in das JSON-Format, so dass im Frontend einfach auf die Daten zugegriffen werden kann
  - die Datei views.py (Pfad: ./api/views.py) enthält alle api-Views für die Modelle und auch für die Benutzerauthentifizierung, die Views sind über die folgenden Links erreichbar: **API-View**: localhost_name/api/; **User-Auth-View**: localhost_name/api/auth/user

### Frontend
Für das Frontend wurde React.js verwendet (Pfad: ./frontend) und Bootstrap als CSS-Framework. Die folgenden Dateien/Ordner wurden angelegt:
  - ./static: 
    - enthält alle statischen Bilder und CSS-, JavaScript-Dateien
  - ./src/components: 
    - Enthält die Komponenten und Seiten der App

## Spezifikation
- #### Benutzer-Authentifizierung: 
  - Besucher können eigene Konten anlegen und sich an- und abmelden. 
- #### Todo: 
  - Angemeldete Benutzer können die Aufgaben auf der Todo-Liste hinzufügen, bearbeiten und löschen. 
  - Der Aufgabensatz wird auf dem Todo-Board in der Startseite angezeigt.
  - Wenn das Optionsfeld angeklickt wird, wird die Aufgabe als erledigt markiert.
- #### Hausaufgaben: 
  - Benutzer, die angemeldet sind, können in der Hausaufgaben-Liste Einträge hinzufügen, bearbeiten und löschen. 
  - Der Hausaufgabensatz wird auf der Hausaufgabentafel in der Heimseite angezeigt.
  - Wenn das Optionsfeld angeklickt wird, wird die Aufgabe als erledigt markiert.
- #### Schüler: 
  - Benutzer, die angemeldet sind, können alle Schüler ihrer Klasse sehen. 
  - Die Schüler werden im Schüler-Board auf der Startseite angezeigt. 
  - Je nach Geschlecht werden unterschiedliche Avatarsymbole angezeigt. 
  - Wenn Sie auf die Bilder klicken, zeigt das Board weitere Informationen über den Schüler an.
- #### Mitglieder-Seite: 
  - Auf dieser Seite kann der Lehrer weitere Schüler mit ihren Daten zu seiner Klasse hinzufügen. 
  - Außerdem kann er für jeden seiner Schüler individuelle Notizen machen. 
- ### Responsive Design:
  - Die App ist vollständig responsive und hat ein korrektes Layout für die wichtigsten Geräte (Handy, Tablet, PC)

## Screenshots
### Startseite
![image](https://user-images.githubusercontent.com/56033013/110243257-e5412200-7f59-11eb-81e5-f31873262abe.png)
### Mitglieder-Seite
![image](https://user-images.githubusercontent.com/56033013/110243521-08200600-7f5b-11eb-968f-3ab2438dd2c9.png)

## Schowcase
[![image](https://user-images.githubusercontent.com/56033013/110246283-576c3380-7f67-11eb-8ab6-ffbbb8c7f2f2.png)](https://youtu.be/sqTZwLPevnI)
