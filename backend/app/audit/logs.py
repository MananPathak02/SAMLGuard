audit_logs = []


def add_log(event: str, status: str):

    audit_logs.append(
        {
            "event": event,
            "status": status,
        }
    )


def get_logs():

    return audit_logs