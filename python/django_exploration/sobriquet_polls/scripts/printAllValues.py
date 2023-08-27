def printAllValues(model):
    field_values = []
    for field in model._meta.get_fields():
        # print(field.name, getattr(model, field.name, ''))
        field_values.append(str(getattr(model, field.name, '')))
    return ' '.join(field_values)
