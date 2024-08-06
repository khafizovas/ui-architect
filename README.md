## Скрипты для упрощения ~~жизни~~ разработки

### Создание компонента

```bash
component create|c <ComponentName> <ComponentType> [ParentView]
```

- `ComponentName` - название компонента,
- `ComponentDirectory` - директория, в которую следует поместить компонент - `ui` | `views` | `components`,
- `ParentView` - название родительского `view`, в директорию которого необходимо поместить создаваемый `component`.

Скрипт создаёт директорию в `src/ui/`, `src/views/` или `src/views/ViewName/` соответственно.

В этой директории генерирует следующие файлы:

- `ComponentName.tsx`,
- `types.ts`,
- `ComponentName.styled.tsx`,
- `ComponentName.stories.tsx`\*,
- `fixtures.ts`\*,
- TODO `ComponentName.spec.tsx`\*,
- `index.ts`.

\* - Не генерируются в случае `ComponentType = 'view'`.

Также при создании компонента его экспорт добавляется в файл `index.ts` родительской директории.
