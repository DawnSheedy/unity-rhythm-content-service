shell:
	docker-compose run web bash

run:
	docker-compose up

build:
	docker-compose build

test:
	docker-compose run web bash -c "python -m coverage run --source='.' manage.py test && python -m coverage report --show-missing"