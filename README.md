# js-ddd

Пример предметной модели в духе Domain Driven Design: кинотеатр с залами,
сеансами, билетами и деньгами.

## Зачем это нужно

Показать, как раскладывается предметная область, когда она перестаёт помещаться
в один файл. Слои разведены намеренно:

- `models/` — сущности предметной области с их правилами;
- `repositories/` — хранение и поиск, отдельно от правил;
- `services/` — сценарии, которые складывают сущности в осмысленное действие
  («продать билет», «создать сеанс»);
- `lib/` — общая обвязка.

Ценность примера в границах между слоями: сущность не знает, где её хранят, а
сценарий не лезет внутрь сущности.

## Запуск

```bash
make install
make test
```

Начинать чтение стоит с `src/services`: там видно, из чего собирается сценарий.

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=js-ddd)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=js-ddd).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
