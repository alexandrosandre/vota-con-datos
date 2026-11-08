"""Reparto legal de escaños (LOREG art. 163), idéntico a web/src/engine/seats.ts."""


def dhondt(votos, escanos, validos, umbral=0.03):
    n = len(votos)
    res = [0] * n
    minimo = umbral * validos
    eleg = [v > 0 and v >= minimo for v in votos]
    for _ in range(escanos):
        mejor, mejor_q = -1, -1.0
        for i in range(n):
            if not eleg[i]:
                continue
            q = votos[i] / (res[i] + 1)
            if q > mejor_q or (q == mejor_q and mejor >= 0 and votos[i] > votos[mejor]):
                mejor, mejor_q = i, q
        if mejor < 0:
            break
        res[mejor] += 1
    return res
